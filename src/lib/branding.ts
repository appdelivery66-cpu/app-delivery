/**
 * CONFIGURACIÓN Rápida DE MARCA (BRANDING)
 * Cambie los valores a continuación para cada nuevo cliente.
 */

export const BRANDING = {
    // Identidad Visual
    name: "Burger Master", // Nombre del Restaurante
    whatsapp: "5511999999999", // Número de WhatsApp (solo números)
    logo: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&q=80", // URL del Logo
    address: "Calle Ejemplo, 123 - Centro", // Dirección física
    pixKey: "tu-email@pix.com", // Clave de pago/PIX del cliente
    deliveryFee: 5.0, // Tasa de entrega estándar

    // Colores (Hexadecimal)
    // DICA: Cambie en src/app/globals.css para reflejar en todo el sitio
    colors: {
        primary: "#E63946", // Color principal (Botones, iconos)
        secondary: "#FFB703", // Color secundario
    },

    // Redes Sociales y Mapas
    googleMapsUrl: "https://goo.gl/maps/ejemplo",
    instagramUrl: "https://instagram.com/restaurante_ejemplo",

    // Horarios de Funcionamiento (Formato 24h)
    openingHours: {
        monday: { open: "18:00", close: "23:00", closed: false },
        tuesday: { open: "18:00", close: "23:00", closed: false },
        wednesday: { open: "18:00", close: "23:00", closed: false },
        thursday: { open: "18:00", close: "23:00", closed: false },
        friday: { open: "18:00", close: "23:59", closed: false },
        saturday: { open: "18:00", close: "23:59", closed: false },
        sunday: { open: "18:00", close: "23:00", closed: false },
    }
};
