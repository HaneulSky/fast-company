import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
const User = ({
  onDelete,
  onBookmark,
  name,
  _id,
  qualities,
  profession,
  completedMeetings,
  rate,
  ...rest
}) => {
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>
        {qualities.map((quality) => (
          <Qualitie {...quality} {...rest} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>
        <button onClick={() => onBookmark(_id)}>
          <Bookmark {...rest} />
        </button>
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(_id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
