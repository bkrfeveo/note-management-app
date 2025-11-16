import DOMPurify from 'dompurify';

const ParsingHTML = ({ html, className= '' }) => {
  const cleanHtml = DOMPurify.sanitize(html);
  
  return (
    <div 
        className={className}
      dangerouslySetInnerHTML={{ __html: cleanHtml }} 
    />
  );
};

export default ParsingHTML;
