import { signInWithGoogle, signOut, useUserState } from "../utilities/firebase";
import 'bootstrap/dist/css/bootstrap.min.css';



const SignInButton = () => {
    return (
        <button type="button" className="btn btn-primary btn-lg btn-block col-12"
            onClick={() => signInWithGoogle()}>
            Sign In With Google
        </button>
    )
};


const SignOuButton = ({ setPhotos }) => {

    return (
        <button className="btn btn-outline-secondary btn-sm"
            onClick={() => {
                setPhotos([]);
                signOut();
            }}>
            Sign Out
        </button>
    )
};

export const UserButton = ({ setPhotos }) => {
    const [user] = useUserState();
    return (
        <>
            {user ? <SignOuButton setPhotos={setPhotos} /> : <SignInButton />}
        </>
    );
}