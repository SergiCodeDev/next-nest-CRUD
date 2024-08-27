export const priceFormat = (price : number) => {
    return new Intl.NumberFormat('es-ES', { // Formato 'es-ES' 
        style: 'currency', // decimal cambiar si quieres solo formatear el numero
        currency: 'EUR', // quitar si quieres solo formatear el numero
        minimumFractionDigits: 2, // 0.00 añade 2 00
        maximumFractionDigits: 2  // 0.25 decimales que quieres (redondea si tiene 3)
    }).format(price);
};

// 55.56 -> 55,56 €
// 1234.57 -> 1.234,57 €
// 34 -> 34,00 €