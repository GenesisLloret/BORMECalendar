// src/Calendar.tsx
import React from 'react';

const Calendar: React.FC = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0 = enero, 11 = diciembre

    // Simulación: días que tienen datos (por ejemplo, del BORME)
    const daysWithData = [3, 12, 18]; // días del mes con datos

    // Número de días en el mes actual
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Día de la semana en que inicia el mes (0 = domingo, 1 = lunes, etc.)
    const firstDay = new Date(year, month, 1);
    const startingDay = firstDay.getDay();

    // Construimos la matriz de semanas (6 filas, 7 columnas)
    const weeks: (number | null)[][] = [];
    let dayCounter = 1;
    for (let week = 0; week < 6; week++) {
        const weekDays: (number | null)[] = [];
        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
            if (week === 0 && dayIndex < startingDay) {
                weekDays.push(null);
            } else if (dayCounter > daysInMonth) {
                weekDays.push(null);
            } else {
                weekDays.push(dayCounter);
                dayCounter++;
            }
        }
        weeks.push(weekDays);
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center' }}>
                {today.toLocaleString('default', { month: 'long' })} {year}
            </h2>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: '2px',
                }}
            >
                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((dayName) => (
                    <div
                        key={dayName}
                        style={{
                            padding: '10px',
                            backgroundColor: '#eee',
                            textAlign: 'center',
                            fontWeight: 'bold',
                        }}
                    >
                        {dayName}
                    </div>
                ))}
                {weeks.map((week, i) =>
                    week.map((dayNum, j) => (
                        <div
                            key={`${i}-${j}`}
                            style={{
                                border: '1px solid #ccc',
                                height: '80px',
                                position: 'relative',
                                padding: '5px',
                            }}
                        >
                            {dayNum ? (
                                <>
                                    <span>{dayNum}</span>
                                    <span
                                        style={{
                                            width: '12px',
                                            height: '12px',
                                            borderRadius: '50%',
                                            backgroundColor: daysWithData.includes(dayNum)
                                                ? 'green'
                                                : 'red',
                                            position: 'absolute',
                                            top: '5px',
                                            right: '5px',
                                        }}
                                    ></span>
                                </>
                            ) : null}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Calendar;
