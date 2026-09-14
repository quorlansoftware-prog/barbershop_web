export type ThemeName = 'bourbon' | 'neon' | 'minimal';

const commonLinks = [
  { label: 'Inicio', href: '#hero' }, { label: 'Servicios', href: '#services' },
  { label: 'Nosotros', href: '#about' }, { label: 'Galería', href: '#gallery' },
  { label: 'Reseñas', href: '#testimonials' }, { label: 'Contacto', href: '#contact' },
];

export const themes = {
  bourbon: {
    title: 'BOURBON & BLADE | Barbería Premium y Refugio del Caballero', brand: 'BOURBON & CUTS', links: commonLinks,
    hero: { eyebrow: 'EL REFUGIO DEL CABALLERO', title: 'Cortes de Autor, Aroma a Roble', description: 'Disfruta del auténtico ritual del afeitado clásico. Sillones de cuero, toallas calientes y un bourbon de cortesía.', image: 'assets/hero.jpg' },
    services: [
      { id: 'kentucky-fade', name: 'Corte “The Kentucky Fade”', description: 'Degradado impecable, lavado con champú de cedro y fijación mate.', price: '28 €', icon: '✂' },
      { id: 'oak-razor', name: 'Ritual “Oak & Razor”', description: 'Esculpido de barba, aceite de almendras y afeitado tradicional.', price: '22 €', icon: '◆' },
      { id: 'bourbon-blade', name: 'Experiencia “Bourbon & Blade”', description: 'Corte, ritual de barba, masaje capilar y degustación.', price: '45 €', icon: '◇' },
    ],
    about: { eyebrow: 'Nuestra Historia', title: 'El Arte de la Barbería Tradicional', paragraphs: ['Rescatamos la esencia de las antiguas barberías clandestinas de los años 20.', 'Cada caballero recibe un trato personalizado con productos artesanales.'], points: ['Maestros barberos con décadas de experiencia', 'Productos orgánicos de formulación propia', 'Barra premium para clientes con reserva'], image: 'assets/service.jpg', badgeValue: '1928', badgeLabel: 'Legado & Tradición' },
    gallery: [{ src: 'assets/hero.jpg', alt: 'Interior de la barbería', caption: 'Ambiente exclusivo' }, { src: 'assets/service.jpg', alt: 'Corte y barba', caption: 'Mid Fade & Beard' }],
    testimonials: [{ quote: 'El trato está a otro nivel y el corte a navaja es como los de antes.', author: 'James T. Sullivan', rating: 5 }, { quote: 'Pura artesanía; es venir a desconectar en un santuario masculino.', author: 'Marcus Harrington', rating: 5 }, { quote: 'La atención al detalle con la barba es inmejorable.', author: 'Victor R. Thorne', rating: 5 }],
    contact: [{ label: 'Dirección', value: '1928 Prohibition Ave, Distrito Histórico' }, { label: 'Teléfono', value: '+34 900 192 800', href: 'tel:+34900192800' }, { label: 'Email', value: 'reservas@bourbonandblade.com', href: 'mailto:reservas@bourbonandblade.com' }, { label: 'Horario', value: 'Lun - Sáb: 10:00 - 20:30 | Dom: Cerrado' }],
    description: 'Tradición, madera de roble, cortes de autor y el mejor whiskey de la ciudad.',
  },
  neon: {
    title: 'VINTAGE CUTS | Barbería Clásica', brand: 'VINTAGE CUTS', links: commonLinks,
    hero: { eyebrow: 'ESTILO CLÁSICO', title: 'Estilo Clásico, Corte Tradicional', description: 'El auténtico estilo de las barberías de toda la vida y máxima precisión en cada corte.', image: 'assets/hero_neon.jpg' },
    services: [{ id: 'vintage-fade', name: 'Corte “Vintage Fade”', description: 'Degradado perfecto con lavado y estilismo final.', price: '28 €', icon: '✂' }, { id: 'retro-shave', name: 'Ritual “Retro Shave”', description: 'Afeitado con toalla caliente, masaje facial y aftershave.', price: '22 €', icon: '◆' }, { id: 'midnight-rider', name: 'Pack “Midnight Rider”', description: 'Corte, afeitado y bebida de cortesía.', price: '45 €', icon: '◇' }],
    about: { eyebrow: 'La Barbería Clásica', title: 'Auténtico Estilo Vintage', paragraphs: ['Mantenemos vivo el oficio tradicional en un espacio limpio y luminoso.', 'Cortes a navaja y arreglos de barba impecables.'], points: ['Sillones vintage restaurados', 'Ambiente clásico y relajado', 'Afeitados con toalla caliente'], image: 'assets/service_neon.jpg', badgeValue: '1984', badgeLabel: 'Clásico & Pulcro' },
    gallery: [{ src: 'assets/hero_neon.jpg', alt: 'Interior vintage', caption: 'Ambiente clásico' }, { src: 'assets/service_neon.jpg', alt: 'Corte clásico', caption: 'Líneas de diseño' }],
    testimonials: [{ quote: 'La mejor barbería de la ciudad y un degradado de gran precisión.', author: 'Kael 7', rating: 5 }, { quote: 'El ritual de barba y el ambiente son increíbles.', author: 'Zane X', rating: 5 }, { quote: 'Rapidez, higiene y un corte que aguanta perfecto.', author: 'Ryu', rating: 5 }],
    contact: [{ label: 'Dirección', value: 'Sector 4, Calle Neón 88' }, { label: 'Teléfono', value: '+34 900 192 800', href: 'tel:+34900192800' }, { label: 'Email', value: 'connect@neonblade.city', href: 'mailto:connect@neonblade.city' }, { label: 'Horario', value: 'Lun - Sáb: 10:00 - 20:30 | Dom: Cerrado' }],
    description: 'Estilo clásico, precisión y el ambiente genuino de una barbería tradicional.',
  },
  minimal: {
    title: 'PURE STUDIO | Barbería Japandi', brand: 'PURE STUDIO', links: commonLinks,
    hero: { eyebrow: 'SANTUARIO DEL BIENESTAR', title: 'Relajación y Armonía', description: 'Un santuario Japandi diseñado para la calma, con tonos cálidos y productos botánicos.', image: 'assets/hero_minimal.jpg' },
    services: [{ id: 'pure-form', name: 'Corte “Pure Form”', description: 'Equilibrio, lavado con agua purificada e hidratación orgánica.', price: '32 €', icon: '✂' }, { id: 'zen-beard', name: 'Ritual “Zen Beard”', description: 'Esencias botánicas, recorte preciso y aceite de argán.', price: '25 €', icon: '◆' }, { id: 'mindfulness', name: 'Experiencia “Mindfulness”', description: 'Corte, barba y masaje craneal purificante.', price: '50 €', icon: '◇' }],
    about: { eyebrow: 'Nuestra Filosofía', title: 'Santuario Japandi', paragraphs: ['Creemos que un corte debe ser una experiencia reparadora.', 'La luz natural, los tonos arena y los materiales nobles invitan a desconectar.'], points: ['Espacio cálido y libre de ruido', 'Cosmética vegana y botánica', 'Higiene premium'], image: 'assets/service_minimal.jpg', badgeValue: '100%', badgeLabel: 'Bienestar & Paz' },
    gallery: [{ src: 'assets/hero_minimal.jpg', alt: 'Espacio zen', caption: 'Luz natural y diseño nórdico' }, { src: 'assets/service_minimal.jpg', alt: 'Corte detallado', caption: 'Precisión pura' }],
    testimonials: [{ quote: 'La tranquilidad del estudio y el trato son exquisitos.', author: 'Lucas C.', rating: 5 }, { quote: 'Los productos orgánicos y la higiene son espectaculares.', author: 'Mateo Blanco', rating: 5 }, { quote: 'Entendieron mi estilo a la primera.', author: 'Elías Ferrer', rating: 5 }],
    contact: [{ label: 'Dirección', value: 'Plaza de la Luz 12, Barrio Blanco' }, { label: 'Teléfono', value: '+34 900 192 800', href: 'tel:+34900192800' }, { label: 'Email', value: 'hello@purestudio.com', href: 'mailto:hello@purestudio.com' }, { label: 'Horario', value: 'Lun - Sáb: 10:00 - 20:30 | Dom: Cerrado' }],
    description: 'Higiene, paz visual, precisión y productos botánicos.',
  },
} satisfies Record<ThemeName, Record<string, unknown>>;
