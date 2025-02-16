const Blob = ({ className, color, delay = 0 }) => {
  return (
    <div 
      className={`
        absolute w-72 h-72 rounded-full 
        mix-blend-multiply filter blur-xl opacity-70 
        animate-blob ${delay ? `animation-delay-${delay}` : ''} 
        bg-${color}-200 
        ${className}
      `}
    />
  );
};

export default Blob; 