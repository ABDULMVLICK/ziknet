function Layout({ children }) {
    return (
      <div className="relative min-h-screen w-full bg-white overflow-hidden">
        {/* Demi-cercle en bas à gauche (gris) */}
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gray-500 opacity-80"></div>
        
        {/* Demi-cercle en haut à droite (beige) */}
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-amber-700 opacity-80"></div>
        
        {/* Contenu de la page */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
  
  export default Layout;