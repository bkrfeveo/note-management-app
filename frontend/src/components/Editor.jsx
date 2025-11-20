import { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function EditorComponent({ onContentChange }) {
  // const apiKey = process.env.REACT_APP_API_KEY_TINYMCE;
  const [content, setContent] = useState('');
  
  const handleEditorChange = (content) => { 
    setContent(content);
    if (typeof onContentChange === 'function'){
      onContentChange(content); // Le 'content' est le HTML formaté
    }
  };

  // console.log(import.meta.env.VITE_API_KEY_TINYMCE);
  
  const editorRef = useRef(null);
  
  return (
    <div>
      <Editor
        // apiKey="wd97hddhf4e5urcknxlcwhha9yb84jhbllrvnou9ykezc8om"
        apiKey={import.meta.env.VITE_API_KEY_TINYMCE}
        onInit={ (_evt, editor) => editorRef.current = editor }
        value={content}
        onEditorChange={handleEditorChange}
        initialValue=""
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }'
        }}
      />
    </div>
  );
}