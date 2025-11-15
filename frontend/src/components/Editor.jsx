import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function EditorComponent({ content }) {
  const editorRef = useRef(null);
  if (editorRef.current) {
    console.log(editorRef.current.getContent());
    content = editorRef.current.getContent();
  }
  const log = () => {
  };

  return (
    <>
      <Editor
        apiKey={process.env.API_KEY_TINYMCE}
        onInit={ (_evt, editor) => editorRef.current = editor }
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
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}