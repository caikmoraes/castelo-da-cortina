<?php
if(isset($_POST['email']) && !empty($_POST['email'])){
    $nome = addslashes($_POST['name']);
    $email = addslashes($_POST['email']);
    $mensagem = addslashes($_POST['message']);
    $about = addslashes($_POST['about']);
    
    $to = "castelodacortina@hotmail.com";
    $subject = $about != null ? $about : "Email enviado pelo site";
    $body = "Nome:" .$nome. "\n".
            "Email".$email. "\n".
            "Mensagem".$mensagem;
    $header = $email."\r\n".
                "Reply-to:".$email."\r\n".
                "X=Mailer:PHP/".phpversion();
    
    if(mail($to,$subject,$body,$header)){
        echo("Email enviado com sucesso");
    }
    else{
        echo("Email não pôde ser enviado");
    }
}
else {
    echo("Houve um erro inesperado.");
}
?>