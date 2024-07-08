// components/RichTextEditor.js
import React from 'react'
import 'react-quill/dist/quill.snow.css'; 
import dynamic from 'next/dynamic';

// Dynamically import react-quill
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface RichTextEditorProps{
    value:string;
    onChange: (value: string) => void;  
}
const RichTextEditor = ({ value, onChange }:RichTextEditorProps) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      className="h-44  font-normal"
    />
  )
}

export default RichTextEditor;
