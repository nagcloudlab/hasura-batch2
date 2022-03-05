import { useState, useRef } from 'react'


const CommentForm = ({ onSubmit }) => {
    const [open, setOpen] = useState(false)
    const commentRef = useRef(null)
    const handleNewComment = () => {
        const comment = commentRef.current.value;
        onSubmit(comment)
        setOpen(false)
    }
    const renderForm = () => {
        if (open) {
            return (<div>
                <div className="card">
                    <div className="card-header">New Comment</div>
                    <div className="card-body">
                        <textarea ref={commentRef} className="form-control"></textarea>
                    </div>
                    <button onClick={e => handleNewComment()} className='btn btn-dark'>Submit</button>
                </div>
            </div>)
        } else {
            return <button onClick={e => setOpen(true)} className='btn btn-primary'>+</button>
        }
    }

    return (
        renderForm()
    )
}

export default CommentForm;