import React from 'react'

function DisplaySection({triggerPreview}) {

  const handleScroll = () => {
    const element = document.querySelector('.jumbotron-section');
    window.scrollTo({
      top: element?.getBoundingClientRect().top,
      left: 0,
      behavior: 'smooth'
    })
  }
  return (
    <div className='display-section wrapper'>
      <h2 className='title'>New</h2>
      <p className='text'>Brilliant</p>
      <span className='description'>
        A display that's up to 2x brighter in the sun
      </span>
      <button className='button' onClick={triggerPreview}>Try me!</button>
      <button className='back-button' onClick={handleScroll}>TOP</button>
    </div>
  )
}

export default DisplaySection