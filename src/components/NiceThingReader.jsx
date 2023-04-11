function NiceThingReader({ niceThing }) {
    return (
        <>
            <div id={niceThing.ID}>
                <h4>{niceThing.FullNameSender}</h4>
                <p>{niceThing.Body}</p>
            </div>
            <br />
        </>
    );
}

export default NiceThingReader;
