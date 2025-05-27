import { Barometer } from 'capacitor-barometer';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    Barometer.echo({ value: inputValue })
}
