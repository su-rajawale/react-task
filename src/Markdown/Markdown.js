import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react';
import './Markdown.css'

function Markdown() {
    const [markdown, setMarkdown] = useState('Markdown')
    
  return (
        <section id='markdown'>
            <textarea className='input' value={markdown} onChange={ (e)=> setMarkdown(e.target.value) }></textarea>
            <article className='result'>
                <ReactMarkdown>
                {markdown}
                </ReactMarkdown>
            </article>
        </section>
  )
}

export default Markdown