import StandardLink from '../links/StandardLink';

function StandardContainer({title,description, image, style}) {
  return (
    <div className={`flex flex-col  items-center justify-center py-3 ${style}`}>
        <p className='text-[50px] font-semibold'>{title}</p>
        <p className='font-thin text-lg'>{description}</p>

         <div className='flex flex-row gap-3 py-3'>
            <StandardLink path="/iphone/iphone-14" name="Learn more >"/>  
            <StandardLink path="/iphone/buy/iphone-14" name="buy >"/>  

         </div>   

        <img src={image} alt="Main banner" className='w-[400px]'  />
    </div>
  )
}

export default StandardContainer