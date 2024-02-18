"use client"

import "./TeacherAddPostModal.css";
import P from "@/generalComponents/texts/P.component";
import Input from "@/generalComponents/inputComponents/generalInputComponent/Input.component";
import Button from "@/generalComponents/button/Button.component";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addPostToFireStore } from "@/services/api/addPostToFireStore";
import { v4 as uuid } from "uuid";

const TeacherAddPostModal = ({ setIsModalOpen, setIsPostsChanged, setEmptyDataText }) => {
    const [ postName, setPostName ] = useState("");
    const [ postNameError, setPostNameError ] = useState(false);
    const [ postText, setPostText ] = useState("");
    const [ postTextError, setPostTextError ] = useState(false);
    const { userid } = useSelector((state) => state.auth.value);
    const [ emptyUseridError, setEmptyUseridError ] = useState(false);
    const [ isSuccessfullyAdded, setIsSuccessfullyAdded ] = useState(false);

    const postInfo = {
        id: uuid(),
        postName,
        postText,
        userid,
    };

    const onAddCourseFormSubmit = async (evt) => {
        evt.preventDefault();

        const createdAtSeconds = new Date();
        const createdAt = createdAtSeconds.getDate() + "/"
                          + (createdAtSeconds.getMonth() + 1) + "/"
                          + createdAtSeconds.getFullYear() + "  "
                          + createdAtSeconds.getHours() + ":"
                          + createdAtSeconds.getMinutes() + ":"
                          + createdAtSeconds.getSeconds();
        postInfo.createdAt = createdAt;

        console.log("Post info: " + JSON.stringify(postInfo));

        if (!postName) {
            setPostNameError(true);
        } else if (!postText) {
            setPostTextError(true);
        } else if (!userid) {
            setEmptyUseridError(true);
        } else {
            const added = await addPostToFireStore(postInfo);

            if (added) {
                setPostName("");
                setPostText("");
                setIsSuccessfullyAdded(true);
                setIsPostsChanged(true);
                setEmptyDataText(false);
            }
        }
    }

    return (
        <div className="t-add-post-modal-container">
            <div className="t-add-post-modal">
                <div className="t-add-post-modal-header">
                    <P text="New post" className="t-add-post-modal-header-text" />
                </div>
                <div className="t-add-post-modal-content">
                    <form onSubmit={onAddCourseFormSubmit}>
                        <Input placeholder="Enter post name"
                               classNameDiv="t-add-post-name-input" 
                               onChangeHandler={(evt) => {
                                                        setPostNameError(false);
                                                        setPostName(evt.target.value);
                                                    }} 
                        />
                        {postNameError &&
                            <P text="Post name can't be empty!" className="t-add-post-name-empty-error" />
                        }

                        <textarea name="t-add-post-text" 
                                  rows="5" 
                                  cols="25"
                                  placeholder="Enter post text..."
                                  className="t-add-post-text-input"
                                  onChange={(evt) => {
                                    setPostTextError(false);
                                    setPostText(evt.target.value);
                                  }}
                        >
                        </textarea>
                        {isSuccessfullyAdded &&
                            <P text="Post successfully added!" className="t-add-post-success-add-text" />
                        }
                        {postTextError &&
                            <P text="Post text can't be empty!" className="t-add-post-name-empty-error" />
                        }
                        {emptyUseridError &&
                            <P text="Error with user! Please login again." className="empty-username-error-text" />
                        } 
                        <div className="t-add-post-modal-buttons">
                            <Button type="submit" label="Submit" className="t-new-post-submit-button" />
                            <Button label="Cancel" className="t-new-post-cancel-button" onClickHandler={() => {setIsModalOpen(false)}} />
                        </div>
                    </form>                    
                </div>                
            </div>
        </div>
    );
};

export default TeacherAddPostModal;