from flask import Flask, render_template


app = Flask(__name__)


# RUTA PRINCIPAL DE LA INVITACION
@app.route("/")
def inicio():

    return render_template("index.html")


# INICIAR EL SERVIDOR
if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5999,
        debug=True
    )