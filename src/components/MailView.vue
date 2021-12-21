<template>
  <div class="email-display">
      <div>
          <button @click="toggleArchive">{{ email.archived ? 'Move to Inbox (e)' : 'Archive (e)' }}</button>
          <button @click="toggleRead">{{ email.read ? 'Mark Unread (r)' : 'Mark Read (r)' }}</button>
          <button @click="goNewer">Newer (k)</button>
          <button @click="goOlder">Older (j)</button>
      </div>
      <h2 class="mb-0">Subject: <strong>{{email.subject}}</strong></h2>
      <div><em>From {{email.from}} on {{format(new Date(email.sentAt), 'MMM do yyyy')}}</em></div>
      <div v-html="marked(email.body)"></div>
  </div>
</template>

<script>
import { format } from "date-fns"
import marked from "marked";
import axios from "axios"
import useKeydown  from "../composables/use-keydown";

export default {
    setup(props) {
        let email = props.email 

        let toggleRead = () => {
            email.read = !email.read
            axios.put(`http://localhost:3000/emails/${email.id}`, email)
        }

        let toggleArchive = () => {
            email.archived = !email.archived
            axios.put(`http://localhost:3000/emails/${email.id}`, email)
        }

        useKeydown([
            {
                key: 'r',
                fn: toggleRead
            }
        ])

        return {
            format,
            marked,
            toggleRead
        }
    },
    props: {
        email: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>

</style>