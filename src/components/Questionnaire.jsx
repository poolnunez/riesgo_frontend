// src/components/Questionnaire.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Questionnaire() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Age: 25, // Default for slider
        Gender: '',
        Academic_Year: '',
        Current_CGPA: 10.00, // Default for slider 0-20
        // Likert questions' scores are stored in likertScores array
        likertScores: Array(20).fill(null), // For Q4-Q23, total 20 questions
        // Yes/No questions
        Financial_Struggles: '',
        Family_Issues: '',
        Academic_Pressure: '',
        Sleep_Quality: '',
        Physical_Health: '',
        Access_to_Support: '',
        Coping_Mechanisms: '',
        Cyberbullying: '',
        Relationship_Problems: '',
        Future_Worries: '',
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Likert question definitions from the provided form text (Q4-Q23)
    // Se mantienen tal cual están en tu código para no alterar la correspondencia con tu backend.
    const likertQuestions = [
        "He perdido interés en actividades que antes disfrutaba.", // Q4 - index 0
        "Me siento desesperanzado/a respecto al futuro.",          // Q5 - index 1
        "Tengo dificultad para dormir o duermo en exceso.",        // Q6 - index 2
        "Me siento constantemente agotado/a sin motivo claro.",    // Q7 - index 3
        "Siento que mi vida no tiene propósito.",                  // Q8 - index 4
        "Me siento aislado/a de los demás.",                       // Q9 - index 5
        "Evito socializar con amigos o familia.",                  // Q10 - index 6
        "Me cuesta concentrarme o tomar decisiones.",              // Q11 - index 7
        "Frecuentemente me siento inútil.",                        // Q12 - index 8
        "He pensado que los demás estarían mejor sin mí.",         // Q13 - index 9
        "He intentado hacerme daño antes.",                        // Q14 - index 10 (Used for Past_Suicidal_Thoughts)
        "Tengo una tristeza persistente difícil de explicar.",     // Q15 - index 11
        "Mis cambios de humor son bruscos y frecuentes.",          // Q16 - index 12
        "Frecuentemente me siento con culpa.",                     // Q17 - index 13
        "Uso alcohol o sustancias para lidiar con emociones.",     // Q18 - index 14 (Used for Substance_Use)
        "No disfruto de lo que me rodea.",                         // Q19 - index 15
        "Siento que estoy atrapado/a sin salida.",                 // Q20 - index 16
        "Tengo pensamientos frecuentes sobre la muerte.",          // Q21 - index 17
        "He buscado ayuda profesional por mis emociones.",         // Q22 - index 18 (Not sent to backend directly, but collected)
        "¿Consideras que actualmente estás en riesgo de suicidio?", // Q23 - index 19 (Not sent to backend directly, but collected)
    ];

    const likertOptions = [
        { label: "Nunca", value: 0 },
        { label: "Casi nunca", value: 1 },
        { label: "A veces", value: 2 },
        { label: "Casi siempre", value: 3 },
        { label: "Siempre", value: 4 },
    ];

    // Indices for calculating Depression, Anxiety, Stress scores (from likertScores array)
    // Estos índices son los que ya tenías y los respeto para la consistencia con tu modelo.
    const depressionQuestionsIndices = [0, 1, 2, 3, 4, 8, 9, 11, 15, 16, 17]; // Q4, Q5, Q6, Q7, Q8, Q12, Q13, Q15, Q19, Q20, Q21
    const anxietyQuestionsIndices = [5, 6, 7]; // Q9, Q10, Q11
    const stressQuestionsIndices = [12, 13, 14]; // Q16, Q17, Q18 (Ojo: Q18 es "Uso alcohol o sustancias...", es posible que el backend lo espere como un campo Sí/No separado en lugar de contribuir a Stress_Score si no es un factor directo de estrés en el modelo)

    // Function to convert numerical CGPA (0-20) to categorical string for backend
    const getCategoricalCGPA = (numericalCGPA) => {
        if (numericalCGPA >= 18.46) return "3.70 - 4.00";
        if (numericalCGPA >= 16.96) return "3.39 - 3.69";
        if (numericalCGPA >= 14.96) return "3.00 - 3.39";
        if (numericalCGPA >= 13.46) return "2.70 - 2.99";
        if (numericalCGPA >= 11.46) return "2.30 - 2.69";
        if (numericalCGPA >= 10.01) return "2.00 - 2.29";
        return "Less than 2.00";
    };

    // Mapea la edad numérica a una cadena de rango de edad
    const mapAgeToRange = (age) => {
        if (typeof age !== 'number' || isNaN(age)) {
            return "20-25"; // Default if age is invalid
        }
        if (age >= 18 && age <= 20) return "18-20";
        if (age >= 21 && age <= 25) return "21-25";
        if (age >= 26 && age <= 30) return "26-30";
        if (age >= 31 && age <= 35) return "31-35";
        if (age >= 36 && age <= 40) return "36-40";
        if (age >= 41 && age <= 45) return "41-45";
        if (age >= 46 && age <= 50) return "46-50";
        console.warn(`Edad ${age} fuera de los rangos definidos. Usando rango predeterminado.`);
        return "20-25"; // Fallback
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSliderChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleLikertChange = (index, value) => {
        const newLikertScores = [...formData.likertScores];
        newLikertScores[index] = value;
        setFormData(prev => ({
            ...prev,
            likertScores: newLikertScores
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const token = localStorage.getItem('accessToken');
        if (!token) {
            setError('No estás autenticado. Por favor, inicia sesión.');
            navigate('/login');
            return;
        }

        // Calculate D/A/S Scores based on the provided indices
        // Important: Ensure these indices truly align with how your backend expects D/A/S scores.
        const depressionScore = depressionQuestionsIndices.reduce((sum, qIndex) => sum + (formData.likertScores[qIndex] || 0), 0);
        const anxietyScore = anxietyQuestionsIndices.reduce((sum, qIndex) => sum + (formData.likertScores[qIndex] || 0), 0);
        const stressScore = stressQuestionsIndices.reduce((sum, qIndex) => sum + (formData.likertScores[qIndex] || 0), 0);

        // Derive Yes/No fields from Likert questions as per your original code
        const socialIsolation = ((formData.likertScores[5] || 0) > 0 || (formData.likertScores[6] || 0) > 0) ? "Yes" : "No"; // From Q9 and Q10
        const substanceUse = (formData.likertScores[14] || 0) > 0 ? "Yes" : "No"; // From Q18
        const pastSuicidalThoughts = (formData.likertScores[10] || 0) > 0 ? "Yes" : "No"; // From Q14

        // Apply age mapping
        const formattedAge = mapAgeToRange(formData.Age);

        const dataToSend = {
            Age: formattedAge,
            Gender: formData.Gender,
            Academic_Year: formData.Academic_Year,
            Current_CGPA: getCategoricalCGPA(formData.Current_CGPA),
            Depression_Score: depressionScore,
            Anxiety_Score: anxietyScore,
            Stress_Score: stressScore,
            Financial_Struggles: formData.Financial_Struggles,
            Family_Issues: formData.Family_Issues,
            Academic_Pressure: formData.Academic_Pressure,
            Social_Isolation: socialIsolation,
            Sleep_Quality: formData.Sleep_Quality,
            Physical_Health: formData.Physical_Health,
            Past_Suicidal_Thoughts: pastSuicidalThoughts,
            Access_to_Support: formData.Access_to_Support,
            Coping_Mechanisms: formData.Coping_Mechanisms,
            Substance_Use: substanceUse,
            Cyberbullying: formData.Cyberbullying,
            Relationship_Problems: formData.Relationship_Problems,
            Future_Worries: formData.Future_Worries,
            // Q22 and Q23 are collected but explicitly NOT sent to backend as per your original plan.
        };

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            };

            const response = await axios.post('https://riesgo-backend.onrender.com/predict', dataToSend, config);
            setMessage('Cuestionario enviado con éxito.');
            // Navegamos a la página de resultados pasando directamente lo que el backend nos devuelve
            navigate('/resultados', {
                state: {
                    predicted_risk_level_label: response.data.predicted_risk_level_label,
                    recommendations: response.data.recommendations
                }
            });

        } catch (err) {
            console.error('Error al enviar el cuestionario:', err.response ? err.response.data : err.message);
            if (err.response && err.response.status === 401) {
                setError('Sesión expirada o no autorizada. Por favor, inicia sesión de nuevo.');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('tokenType');
                navigate('/login');
            } else if (err.response && err.response.data && err.response.data.detail) {
                setError(`Error: ${err.response.data.detail}`);
            } else {
                setError('Error al enviar el cuestionario. Por favor, inténtalo de nuevo.');
            }
        }
    };

    // --- Estilos --- (Mantengo tus estilos tal cual los tenías, son consistentes)
    const containerStyle = {
        padding: '30px',
        maxWidth: '700px',
        margin: '40px auto',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        background: 'rgba(255, 255, 255, 0.08)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderRadius: '15px',
        boxShadow: '0 10px 40px 0 rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        color: '#e0e0e0',
        textAlign: 'center',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    };

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        marginTop: '20px',
        textAlign: 'left'
    };

    const labelStyle = {
        marginBottom: '5px',
        fontWeight: 'bold',
        color: '#f0f0f0',
        fontSize: '1.1em'
    };

    const inputStyle = {
        width: 'calc(100% - 20px)',
        padding: '12px 10px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        background: 'rgba(255, 255, 255, 0.1)',
        color: '#e0e0e0',
        fontSize: '1em',
        outline: 'none',
        boxSizing: 'border-box'
    };

    const radioGroupStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '15px',
        justifyContent: 'flex-start',
        marginTop: '10px'
    };

    const radioLabelStyle = {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        fontSize: '0.95em',
        color: '#c0c0c0',
        padding: '8px 12px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        background: 'rgba(255, 255, 255, 0.05)',
        transition: 'all 0.2s ease'
    };

    const radioInputStyle = {
        marginRight: '8px',
        accentColor: '#9370db',
        cursor: 'pointer'
    };

    const buttonStyle = {
        padding: '15px 30px',
        fontSize: '1.3em',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        background: 'linear-gradient(135deg, #8a2be2 0%, #9370db 100%)',
        color: 'white',
        fontWeight: 'bold',
        boxShadow: '0 6px 20px rgba(138, 43, 226, 0.4)',
        transition: 'all 0.3s ease',
        marginTop: '30px',
        width: 'auto',
        alignSelf: 'center'
    };

    const messageStyle = {
        marginTop: '20px',
        fontSize: '1.1em',
        color: '#90ee90'
    };

    const errorStyle = {
        marginTop: '20px',
        fontSize: '1.1em',
        color: '#ff6b6b'
    };

    const sliderContainerStyle = {
        width: '100%',
        marginTop: '10px',
        marginBottom: '20px'
    };

    const academicYears = [];
    for (let i = 1; i <= 10; i++) {
        academicYears.push(`${i}${i === 1 ? 'er' : i === 2 ? 'do' : i === 3 ? 'er' : 'mo'} Año o Equivalente`);
    }

    return (
        <div style={containerStyle}>
            <h1 style={{ fontSize: '2.5em', marginBottom: '25px', color: '#f0f0f0' }}>
                Cuestionario de Bienestar Emocional y Estado de Ánimo
            </h1>
            <p style={{ fontSize: '1.1em', color: '#c0c0c0', marginBottom: '30px' }}>
                Por favor, completa la siguiente información.
            </p>

            <form onSubmit={handleSubmit} style={formStyle}>
                {/* Age (Edad) - Slider */}
                <div>
                    <label style={labelStyle}>Edad: {formData.Age}</label>
                    <div style={sliderContainerStyle}>
                        <input
                            type="range"
                            name="Age"
                            min="18"
                            max="50"
                            value={formData.Age}
                            onChange={(e) => handleSliderChange('Age', Number(e.target.value))}
                            style={{ width: '100%', accentColor: '#9370db' }}
                        />
                    </div>
                </div>

                {/* Gender (Género) - Dropdown */}
                <div>
                    <label style={labelStyle}>Género:</label>
                    <select
                        name="Gender"
                        value={formData.Gender}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    >
                        <option value="">Selecciona tu género</option>
                        <option value="Female">Femenino</option>
                        <option value="Male">Masculino</option>
                        <option value="Other">Otro</option>
                    </select>
                </div>

                {/* Academic Year (Año Académico) - Dropdown */}
                <div>
                    <label style={labelStyle}>Año Académico:</label>
                    <select
                        name="Academic_Year"
                        value={formData.Academic_Year}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    >
                        <option value="">Selecciona tu año académico</option>
                        {academicYears.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                {/* Current CGPA (GPA Actual) - Slider (0-20) */}
                <div>
                    <label style={labelStyle}>CGPA Actual (Promedio Académico): {formData.Current_CGPA.toFixed(2)}</label>
                    <div style={sliderContainerStyle}>
                        <input
                            type="range"
                            name="Current_CGPA"
                            min="0.00"
                            max="20.00"
                            step="0.01"
                            value={formData.Current_CGPA}
                            onChange={(e) => handleSliderChange('Current_CGPA', Number(e.target.value))}
                            style={{ width: '100%', accentColor: '#9370db' }}
                        />
                    </div>
                </div>

                {/* Likert Questions (Q4-Q23 from user's list) */}
                {likertQuestions.map((question, index) => (
                    <div key={index}>
                        <label style={labelStyle}>
                            {`${index + 4}. ${question}`}
                        </label>
                        <div style={radioGroupStyle}>
                            {likertOptions.map(option => (
                                <label key={option.value} style={radioLabelStyle}>
                                    <input
                                        type="radio"
                                        name={`likert_q${index}`}
                                        value={option.value}
                                        checked={formData.likertScores[index] === option.value}
                                        onChange={() => handleLikertChange(index, option.value)}
                                        required
                                        style={radioInputStyle}
                                    />
                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Remaining 10 Yes/No Questions from Processed.csv */}
                {[
                    { name: "Financial_Struggles", label: "¿Tienes dificultades financieras?" },
                    { name: "Family_Issues", label: "¿Tienes problemas familiares?" },
                    { name: "Academic_Pressure", label: "¿Experimentas presión académica?" },
                    // Social_Isolation is now derived from Likert Q9/Q10 (indices 5 and 6)
                    { name: "Sleep_Quality", label: "¿Tienes buena calidad de sueño?" },
                    { name: "Physical_Health", label: "¿Tienes problemas de salud física?" },
                    // Past_Suicidal_Thoughts is now derived from Likert Q14 (index 10)
                    { name: "Access_to_Support", label: "¿Tienes acceso a redes de apoyo?" },
                    { name: "Coping_Mechanisms", label: "¿Utilizas mecanismos de afrontamiento saludables?" },
                    // Substance_Use is now derived from Likert Q18 (index 14)
                    { name: "Cyberbullying", label: "¿Has sido víctima de ciberacoso?" },
                    { name: "Relationship_Problems", label: "¿Tienes problemas en tus relaciones personales?" },
                    { name: "Future_Worries", label: "¿Te preocupas excesivamente por el futuro?" }
                ].map(field => (
                    <div key={field.name}>
                        <label style={labelStyle}>{field.label}</label>
                        <div style={radioGroupStyle}>
                            <label style={radioLabelStyle}>
                                <input
                                    type="radio"
                                    name={field.name}
                                    value="Yes"
                                    checked={formData[field.name] === "Yes"}
                                    onChange={handleChange}
                                    required
                                    style={radioInputStyle}
                                />
                                Sí
                            </label>
                            <label style={radioLabelStyle}>
                                <input
                                    type="radio"
                                    name={field.name}
                                    value="No"
                                    checked={formData[field.name] === "No"}
                                    onChange={handleChange}
                                    required
                                    style={radioInputStyle}
                                />
                                No
                            </label>
                        </div>
                    </div>
                ))}

                <button
                    type="submit"
                    style={buttonStyle}
                    onMouseOver={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #6a1aab 0%, #7c58c2 100%)';
                        e.target.style.boxShadow = '0 8px 25px rgba(138, 43, 226, 0.6)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #8a2be2 0%, #9370db 100%)';
                        e.target.style.boxShadow = '0 6px 20px rgba(138, 43, 226, 0.4)';
                    }}
                >
                    Enviar Cuestionario
                </button>
            </form>

            {message && <p style={messageStyle}>{message}</p>}
            {error && <p style={errorStyle}>{error}</p>}
        </div>
    );
}

export default Questionnaire;