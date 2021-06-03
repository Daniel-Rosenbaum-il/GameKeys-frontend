
export function UserHeader({fullname}) {
    const backgroundImg = require(`../../assets/img/background-user.jpg`).default
    const userImg = require(`../../assets/img/user1.jpg`).default

    return (
        <header>
            <div className="user-profile-header">
                <img className="hero" src={backgroundImg} alt="" />
                <div>
                    <img className="avatar" src={userImg} alt=""></img>
                </div>
            </div>
            <h2 className="username-title" >Hello {fullname}</h2>
        </header>
    )


}