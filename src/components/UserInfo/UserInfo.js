import React, { useEffect, useState } from 'react';
import './css/userInfo.css';

const UserInfo = ({user, users}) => {
    const [recommended, setRecommended] = useState([]);
    useEffect(() => {
        const similarUsers = [];
        users.forEach((u) => {
            if(user.age === u.age && user.gender === u.gender && u !== user) {
                let i = 0;
                user.interests.some((p) => {
                    if(u.interests.includes(p)) {
                        i++;
                        if(i >= 2) {
                            similarUsers.push(u);
                        }
                    }
                })
            }
        })
        const similarProducts = [];
        user.itemHistory.forEach((item) => {
            similarUsers.forEach((sUser) => {
                sUser.itemHistory.forEach((sItem) => {
                    if(sItem !== item) {
                        similarProducts.push(sItem);
                    }
                })
            })
        })
        let filteredProductsArr = [];
        similarProducts.forEach((product) => {
            if (!filteredProductsArr.includes(product) && !user.itemHistory.includes(product)) {
                filteredProductsArr.push(product);
            }
        });
        setRecommended(filteredProductsArr);
    }, [user]);
    return (
        <div className="user-info">
            <ul>
                <li>
                    <span className="primary-text">Name:</span>
                    <span className="secondary-text">{user.firstName} {user.lastName}</span>
                </li>
                <li>
                    <span className="primary-text">Age:</span>
                    <span className="secondary-text">{user.age}</span>
                </li>
                <li>
                    <span className="primary-text">Gender:</span>
                    <span className="secondary-text">{user.gender}</span>
                </li>
                <li>
                    <span className="primary-text">Interests:</span>
                    <span className="secondary-text">{user.interests.join(', ')}</span>
                </li>
            </ul>
            <div className="recommended-products">
                <h2>Recommended products</h2>
                <div className="products-wrap">
                    {recommended.map((item, index) => {
                        if(index < 5) {
                            return <p className="recommended-product" key={index}>{item}</p>
                        } else {
                            return
                        }
                    })}
                </div>
            </div>
        </div>
    )
}

export default UserInfo;
