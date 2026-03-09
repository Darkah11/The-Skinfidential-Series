importScripts("https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js")

firebase.initializeApp({
    apiKey: "AIzaSyDmhke5mxaeXGufLD6SG6cJMlvS1IOW2_I",
    messagingSenderId: "330068577712",
    projectId: "the-skinfidential-series",
    appId: "1:330068577712:web:835dddf01d7b6e3e50da75"
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/logo.jpg",
        data: payload.data
    })
})

self.addEventListener("notificationclick", function (event) {

    event.notification.close()

    const link = event.notification.data?.link || "/admin/orders"

    event.waitUntil(
        clients.openWindow(link)
    )

})