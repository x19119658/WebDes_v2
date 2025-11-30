document.getElementById("cform").addEventListener("submit", function (event) {

    event.preventDefault();

    let name = document.getElementById("username").value.trim();

    let name2 = document.getElementById("username2").value.trim();

    let email = document.getElementById("email").value.trim();

    let msg = document.getElementById("message").value.trim();

    if (name === "") {

        document.getElementById("error1").innerHTML = "Please enter your first name";

        return;

    }

    if (name2 === "") {

        document.getElementById("error2").innerHTML = "Please enter your last name";

        return;

    }

    
    if (!email.includes("@") || !email.includes(".") || email === "") {

        document.getElementById("error3").innerHTML = "Please enter a valid email address";;

        return;

    }
    if (msg === "" ) {

        document.getElementById("error4").innerHTML = "Please enter your message";

        return;

    }

    document.getElementById("cform").style.display = "none";
    document.getElementById("thankyou").innerHTML = "Thank you for contacting us. Our dedicated team will respond</br> in the next 24 hours. our live chat is open everyday</br> from Monday to Friday from 8AM to 5PM";

});

