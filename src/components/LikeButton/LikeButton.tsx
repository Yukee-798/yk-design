import React, { useState, useEffect } from 'react'

interface ILikeButton {

}

const LikeButton: React.FC<ILikeButton> = (props) => {
    const [like, setLike] = useState(0);
    document.title = String(like);

    useEffect(() => {
        return () => {
            
        };
    });
    return (
        <button onClick={() => {setLike(like + 1)}}>{like}👍</button>
    )
}

export default LikeButton;