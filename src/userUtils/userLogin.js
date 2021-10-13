import {signInWithGoogle, signOut, useUserState} from "../utilities/firebase";


const SignInButton = () => (
    <button className="btn btn-secondary btn-sm"
            onClick={() => signInWithGoogle()}>
        Sign In
    </button>
);


const SignOuButton = () => (
    <button className="btn btn-secondary btn-sm"
            onClick={() => signOut()}>
        Sign Out
    </button>
);

export const UserButton = () => {
    const [user] = useUserState();
    console.log(user);
    return (

        <div>
            {user ? <SignOuButton/> : <SignInButton/>}
        </div>
    )
        ;
}