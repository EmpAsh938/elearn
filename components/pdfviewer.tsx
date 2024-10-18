"use client";

import { Document, Page } from 'react-pdf';
import { useState } from 'react';
import { Button } from './ui/button';


export function PDFViewer({ fileUrl }: { fileUrl: string }) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <Document
                file={fileUrl} // URL or path to your PDF
                onLoadSuccess={onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
            </Document>
            <p>
                Page {pageNumber} of {numPages}
            </p>
            <div className='flex gap-2'>
                <Button
                    disabled={pageNumber <= 1}
                    onClick={() => setPageNumber((prevPage) => prevPage - 1)}
                >
                    Previous
                </Button>
                <Button
                    disabled={pageNumber >= (numPages || 1)}
                    onClick={() => setPageNumber((prevPage) => prevPage + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
