import React, {Component} from 'react';
import fs from 'fs';
import pdf from 'html-pdf'; 
import ReactDOMServer from 'react-dom/server'


let module
const getBase64String = (path) => {
    try {
        const file = fs.readFileSync(path)
        return new Buffer(file).toString('base64')
    } catch (exception) {
        module.reject(exception)
    }
}

const generatePDF = (html, fileName) => {
    try {
        pdf.create(html, {
            format : "Letter",
            border : {top : '0.1in', bottom : '0.1in', right : '0.1in', left : '0.1in'}
        }).toFile('./tmp/' + {filnename}, (error, response) => {
            if(error) {
                module.reject(error)    
            } else {
                module.resolve({fileName, base64 : getBase64String(response.filename)})
                fs.unlink(response.filename)
            }
        })
    } catch (exception) {
        module.reject(exception)
    }
}

const getComponentAsHTML = (component, props) => {
    try {
        return ReactDOMServer.renderToStaticMarkup(component(props))
    } catch (exception) {
        module.reject(exception)
    }
}

const handler = ({component, props, fileName}, promise) => {
    module = promise
    const html = getComponentAsHTML(component, props)
    if (html && fileName) generatePDF(html, fileName)
}

export const generateComponentAsPDF = (options) => {
    return new promise((resolve, reject) => {
        return handler(options, {resolve, reject})
    })
}
