import LoginForm from "./LoginForm";

export default function Home() {
    return (
        <div className="row login">
            <div className="col md-10">
                {/* <img src="customDesign1" /> */}
                <h1>Custom Threads</h1>
                <div>
                    <h2>create your own custom designed</h2>
                    <h3>t-shirts on demand</h3>
                </div>
            </div>
            <div className="col md-2">
                <LoginForm />
            </div>
        </div>
    )
}