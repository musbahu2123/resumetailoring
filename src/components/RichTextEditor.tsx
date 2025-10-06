// components/RichTextEditor.tsx - UPDATED
"use client";

import { useRef, useState, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: number;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  height = 500,
}: RichTextEditorProps) {
  const editorRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration by only rendering TinyMCE after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render TinyMCE during SSR to avoid hydration mismatch
  if (!isMounted) {
    return (
      <div className="rich-text-editor border border-gray-300 rounded-lg overflow-hidden">
        <div
          className="bg-gray-50 rounded-lg flex items-center justify-center text-gray-500"
          style={{ height: `${height}px` }}
        >
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <div className="text-sm">Loading editor...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rich-text-editor border border-gray-300 rounded-lg overflow-hidden">
      <Editor
        apiKey="38mc0utpa0fu4hfzhpulrhay26hchg3pplckj27imj9oam2p"
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        onEditorChange={onChange}
        init={{
          height: height,
          menubar: true,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | bold italic underline strikethrough | " +
            "forecolor backcolor | alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | link image | " +
            "removeformat | help | code",
          menu: {
            file: {
              title: "File",
              items: "newdocument restoredraft | preview | print ",
            },
            edit: {
              title: "Edit",
              items: "undo redo | cut copy paste | selectall | searchreplace",
            },
            view: {
              title: "View",
              items:
                "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen",
            },
            insert: {
              title: "Insert",
              items:
                "image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime",
            },
            format: {
              title: "Format",
              items:
                "bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align lineheight | forecolor backcolor | removeformat",
            },
            tools: {
              title: "Tools",
              items: "spellchecker spellcheckerlanguage | code wordcount",
            },
            table: {
              title: "Table",
              items: "inserttable | cell row column | tableprops deletetable",
            },
            help: { title: "Help", items: "help" },
          },
          content_style: `
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; 
              font-size: 14px; 
              line-height: 1.6;
              color: #374151;
            }
            h1 { 
              font-size: 2em; 
              margin: 0.67em 0; 
              color: #111827;
              font-weight: 700;
              border-bottom: 1px solid #e5e7eb;
              padding-bottom: 0.3em;
            }
            h2 { 
              font-size: 1.5em; 
              margin: 0.83em 0; 
              color: #1f2937;
              font-weight: 600;
            }
            h3 { 
              font-size: 1.25em; 
              margin: 1em 0; 
              color: #374151;
              font-weight: 600;
            }
            h4 { 
              font-size: 1.1em; 
              margin: 1.33em 0; 
              color: #4b5563;
              font-weight: 600;
            }
            p { 
              margin: 1em 0; 
              line-height: 1.7;
            }
            ul, ol { 
              padding-left: 2em; 
              margin: 1em 0;
            }
            li { 
              margin: 0.5em 0; 
              line-height: 1.6;
            }
            blockquote {
              border-left: 4px solid #3b82f6;
              padding-left: 1em;
              margin: 1em 0;
              font-style: italic;
              color: #6b7280;
            }
            table {
              border-collapse: collapse;
              width: 100%;
              margin: 1em 0;
            }
            table, th, td {
              border: 1px solid #d1d5db;
            }
            th, td {
              padding: 0.75em;
              text-align: left;
            }
            th {
              background-color: #f9fafb;
              font-weight: 600;
            }
            a {
              color: #3b82f6;
              text-decoration: underline;
            }
            a:hover {
              color: #2563eb;
            }
            .mce-content-body[data-mce-placeholder]:not(.mce-visualblocks)::before {
              color: #9ca3af;
              font-style: italic;
            }
          `,
          placeholder:
            placeholder || "Start writing your amazing content here...",
          branding: false,
          statusbar: true,
          elementpath: true,
          resize: true,
          promotion: false,
          link_context_toolbar: true,
          image_advtab: true,
          importcss_append: true,
          templates: [
            {
              title: "Blog Post Template",
              description:
                "Pre-formatted blog post template with SEO structure",
              content: `
                <h1>Your Compelling Headline Here</h1>
                
                <p><strong>Start with an engaging introduction that hooks the reader and includes your focus keyword naturally in the first paragraph.</strong></p>
                
                <h2>Table of Contents</h2>
                <ul>
                  <li><a href="#section1">Main Section 1</a></li>
                  <li><a href="#section2">Main Section 2</a></li>
                  <li><a href="#section3">Main Section 3</a></li>
                  <li><a href="#key-takeaways">Key Takeaways</a></li>
                  <li><a href="#faq">FAQ</a></li>
                </ul>
                
                <h2 id="section1">Main Section 1</h2>
                <p>Provide valuable information in this section. Use bullet points or numbered lists to improve readability.</p>
                
                <h3>Subsection Details</h3>
                <ul>
                  <li>Important point 1 with details</li>
                  <li>Important point 2 with details</li>
                  <li>Important point 3 with details</li>
                </ul>
                
                <h2 id="section2">Main Section 2</h2>
                <p>Continue providing valuable content. Use tables for comparisons when relevant.</p>
                
                <h2 id="section3">Main Section 3</h2>
                <p>Add more comprehensive information. Include examples and practical tips.</p>
                
                <h2 id="key-takeaways">Key Takeaways</h2>
                <ul>
                  <li>Key learning point 1</li>
                  <li>Key learning point 2</li>
                  <li>Key learning point 3</li>
                </ul>
                
                <h2 id="faq">Frequently Asked Questions</h2>
                
                <h3>Question 1?</h3>
                <p>Detailed answer to the first common question.</p>
                
                <h3>Question 2?</h3>
                <p>Detailed answer to the second common question.</p>
                
                <div style="background-color: #f3f4f6; padding: 1.5em; border-radius: 0.5em; margin: 2em 0;">
                  <h3>Ready to Put This Into Practice?</h3>
                  <p>Create your perfect resume with our AI-powered tools and start landing more interviews today!</p>
                </div>
              `,
            },
          ],
          setup: (editor) => {
            editor.on("keyDown", (e) => {
              // Add custom keyboard shortcuts if needed
            });
          },
        }}
      />
    </div>
  );
}
