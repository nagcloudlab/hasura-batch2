import CommentForm from './CommentForm'
import { gql, useMutation } from '@apollo/client';

// Define mutation
const NEW_COMMNET = gql`
    mutation CreateNewComment($photoId:Int,$comment:String) {
        insert_comments_one(object: {photo_id: $photoId, comment: $comment}) {
        id
        photo_id
        }
    }
`;

const Photo = ({ value: photo }) => {
    const [mutateFunction, { data, loading, error }] = useMutation(NEW_COMMNET);
    const renderComments = () => {
        return photo.comments.map(comment => {
            return (
                <div key={comment.id} className="alert alert-danger">
                    {comment.comment}
                </div>
            )
        })
    }

    const addNewComment = newComment => {
        mutateFunction({
            variables: {
                photoId: photo.id,
                comment: newComment
            }
        })
    }

    return (
        <div className="card card-body">
            <div className="row">
                <div className="col-4">
                    <img src={photo.photo_url} />
                    <blockquote>
                        {photo.description}
                    </blockquote>
                </div>
                <div className="col-6">
                    <div className="display-6">
                        {renderComments()}
                    </div>
                    <CommentForm onSubmit={comment => addNewComment(comment)} />
                </div>
            </div>
        </div>
    )
}

export default Photo;