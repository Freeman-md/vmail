import { reactive } from "vue"

let emails = reactive(new Set())  

export const useEmailSelection = function () { 

    let toggle = function (email) {
        if (emails.has(email)) {
            emails.delete(email)
        } else {
            emails.add(email)
        }
        console.log(emails)
    }

    let clear = () => {
        emails.clear()
    }

    let addMultiple = (newEmails) => {
        newEmails.forEach(email => emails.add(email))
    } 

    return {
        toggle,
        emails,
        clear,
        addMultiple
    }
}

export default useEmailSelection