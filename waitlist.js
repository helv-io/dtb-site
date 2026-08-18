(function () {
  var form = document.getElementById("waitform");
  var status = document.getElementById("waitstatus");
  if (!form || !status) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var email = (form.email.value || "").trim();
    if (!email) return;

    var btn = form.querySelector("button");
    btn.disabled = true;
    status.hidden = false;
    status.textContent = "Joining…";

    fetch("https://formsubmit.co/ajax/helvio88@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: email,
        _subject: "dTb waitlist",
      }),
    })
      .then(function (r) {
        return r.json().then(function (body) {
          return { ok: r.ok, body: body };
        });
      })
      .then(function (res) {
        if (res.ok) {
          status.textContent = "You're on the list. We'll tell you when the first kit is real.";
          form.reset();
        } else {
          status.textContent = "That didn't go through. Try again in a minute.";
          btn.disabled = false;
        }
      })
      .catch(function () {
        status.textContent = "That didn't go through. Try again in a minute.";
        btn.disabled = false;
      });
  });
})();
