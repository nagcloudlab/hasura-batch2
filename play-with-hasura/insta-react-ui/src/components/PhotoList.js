import Photo from "./Photo"
import {
    gql,
    useQuery,
    useSubscription
} from "@apollo/client";

const GET_PHOTOS = gql`
subscription GetPhotos{
    photos{
      id
      photo_url
      description
    }
  }
`;

const PhotoList = () => {
    const { loading, error, data } = useSubscription(GET_PHOTOS) // POST: http://hasura-server
    console.log(data)
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const renderPhotos = () => {
        if (data) {
            if (data.photos)
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