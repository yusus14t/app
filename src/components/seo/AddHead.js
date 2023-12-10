const AddHead = ({children, seoContent }) => {
    document.getElementById("descripton").content = seoContent.description
    document.getElementById("keyword").content = seoContent.keyword; 
    document.getElementById("canonical").href = window.location.pathname; 

  return children
  
}

export default AddHead