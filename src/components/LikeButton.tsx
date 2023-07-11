import React, {useState} from 'react'

type Props = {
  onClick: () => void;
}

export default function LikeButton({ onClick }: Props) {
  const [liked, setLiked] = useState<boolean>(false);

  const handleClicked = ():void => {
    setLiked(!liked);
    onClick();
  }

  return (
    <button onClick={handleClicked} className={liked ? 'liked' : '' }>♥</button>
  )
}