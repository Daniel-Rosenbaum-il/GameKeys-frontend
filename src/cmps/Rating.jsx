import { ReactComponent as StarSvg } from '../assets/img/icons/star.svg'

export function Rating({ rating, handleChange, isPreview }) {
  function onHandleChange(ev) {
    if (!isPreview) handleChange(ev)
  }
  return (
    <div className="review-rating-stars">
      <label htmlFor="rate-1" className={rating >= 1 ? 'star-active' : ''}>
        <StarSvg />
      </label>
      <input type="radio" name="rating" id="rate-1" value={1} onChange={onHandleChange} hidden />
      <label htmlFor="rate-2" className={rating >= 2 ? 'star-active' : ''}>
        <StarSvg />
      </label>
      <input type="radio" name="rating" id="rate-2" value={2} onChange={onHandleChange} hidden />
      <label htmlFor="rate-3" className={rating >= 3 ? 'star-active' : ''} >
        <StarSvg />
      </label>
      <input type="radio" name="rating" id="rate-3" value={3} onChange={onHandleChange} hidden />
      <label htmlFor="rate-4" className={rating >= 4 ? 'star-active' : ''} >
        <StarSvg />
      </label>
      <input type="radio" name="rating" id="rate-4" value={4} onChange={onHandleChange} hidden />
      <label htmlFor="rate-5" className={rating === 5 ? 'star-active' : ''}>
        <StarSvg />
      </label>
      <input type="radio" name="rating" id="rate-5" value={5} onChange={onHandleChange} hidden />
    </div>
  )
}
