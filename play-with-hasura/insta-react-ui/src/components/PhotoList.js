import Photo from "./Photo"
import {
    gql,
    useSubscription
} from "@apollo/client";

const GET_PHOTOS = gql`
subscription GetPhotos{
    photos{
      id
      photo_url
      description
      comments(limit:10){
        id
        comment
        created_at
      }
    }
  }
`;

const PhotoList = () => {
    const { loading, error, data } = useSubscription(GET_PHOTOS) // POST: http://hasura-server

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const renderPhotos = () => {
        if (data) {
            return data.photos.map(photo => {
                return <Photo key={photo.id} value={photo} />
            })
        }
    }

    return (
        <div className="card card-body">
            {renderPhotos()}
        </div>
    )

}

export default PhotoList;