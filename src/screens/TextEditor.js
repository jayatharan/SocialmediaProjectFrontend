import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const TextEditor = () => {
    const editorRef = useRef(null);
    
    const log = () => {
        if (editorRef.current) {
        console.log(editorRef.current.getContent());
        }
    };

    return (
        <div className="pt-5">
            <div className="mt-5">
            <Editor
                onInit={(evt, editor) => editorRef.current = editor}
                onChange={()=>console.log(editorRef.current.getContent())}
                initialValue=""
                init={{
                menubar: false,
                plugins: [
                    'advlist autolink lists link image charmap print preview anchor',
                    'searchreplace visualblocks code fullscreen',
                    'insertdatetime media table paste code help wordcount'
                ],
                toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
            <button onClick={log}>Log editor content</button>
                </div>
        </div>
    )
}

export default TextEditor
