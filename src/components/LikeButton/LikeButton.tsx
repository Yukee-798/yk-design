import React, { useState } from 'react'

interface ILikeButton {


}

const LikeButton: React.FC<ILikeButton> = (props) => {
    const [like, setLike] = useState(0);
    return (
        <button onClick={() => {setLike(like + 1)}}>{like}👍</button>
    )
}

export default LikeButton;