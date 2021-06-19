const isNotificationsSupported = () => window.hasOwnProperty('Notification')

class NotificationService {
  constructor() {
    isNotificationsSupported() &&
      Notification.requestPermission(function (status) {
        console.log('Notification permission status:', status)
      })
  }

  send = (text: string) => {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then(function (reg) {
        reg !== undefined && reg
          ? reg.showNotification(text)
          : console.log("Notification isn't delivered")
      })
    }
  }
}

const notificationService = new NotificationService()

export { isNotificationsSupported, notificationService }
