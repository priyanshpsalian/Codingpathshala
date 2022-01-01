const Name = document.querySelector('.hidden1');
const vidpath = document.querySelector('.hidden2').innerHTML;

console.log(Name.innerHTML);
console.log(vidpath);

setTimeout(function() {
    document.getElementById('hcb_form_name').value=Name.innerHTML;
    document.getElementsByName('content')[0].placeholder="Type a message";
    
}, 1500);

function setVideoSource(selector, src) {
  
    const element = document.querySelector(selector);
    
    /* 
    Check that element is video before proceeding 
    */
    if(element.nodeName === 'VIDEO') {
      
      for(const source of element.querySelectorAll('source')) {
        element.removeChild(source);
      }
      
      /* 
      Create a new source element and populate it with the src
      attribute 
      */
      const source = document.createElement('source');    
      source.setAttribute('src', src);    

      element.appendChild(source);    
    }
  }

  // Update source of existing video

  setVideoSource('#video',vidpath);