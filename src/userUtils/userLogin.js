import {signInWithGoogle, signOut, useUserState} from "../utilities/firebase";


const SignInButton = () => {
    return (
        <button className="btn btn-secondary btn-sm"
                onClick={() => signInWithGoogle()}>
            Sign In With Google
        </button>
    )
};


const SignOuButton = ({setPhotos}) => {

    return (
        <button className="btn btn-secondary btn-sm"
                onClick={() => {
                    setPhotos([]);
                    signOut();
                }}>
            Sign Out
        </button>
    )
};

export const UserButton = ({setPhotos}) => {
    const [user] = useUserState();
    return (
        <div>
            {user ? <SignOuButton setPhotos={setPhotos}/> : <SignInButton/>}
        </div>
    );
}