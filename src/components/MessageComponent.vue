<template>
    <div :class=toogle>
        <div :class=currentAlert role="alert">

            <div class="card">
                <div class="card-header">
                    <i :class=icon></i>
                    {{ cabecera }}
                </div>
                <div class="card-body">
                    <h4 class="card-title">Este no se lo he pasado</h4>
                    <p class="card-text">{{ text }}</p>
                </div>
                <div class="card-footer text-muted">
                    Footer
                    <a type="button" class="btn-close" @click="cierra" aria-label="Close"></a>
                </div>
            </div>

        </div>
    </div> 
</template>

<script>
export default {
    props: ['text', 'duration', 'alertType', 'iconType', 'cabecera'],
    data: function() {
        return {
            toogle: 'oculta',
            timer: null,
            alertTypes: ['alert-primary','alert-secondary','alert-success','alert-danger', 'alert-warning', 'alert-info', 'alert-dark'],
            iconTypes: ['none','fa-warning','fa-heart','fa-thumbs-up'],
            icon: 'fa-solid fa-warning fa-2xl right-space',
            currentAlert: ''
        }
    },
    methods: {
        cierra: function() {
            this.toogle = 'oculta'
        },
        presenta: function() {
            this.icon = 'fa-solid ' + this.iconTypes[this.iconType%4] + ' fa-2xl right-space'
            this.currentAlert = 'alert ' + this.alertTypes[this.alertType%7] + ' alert-dismissible fade show'
            this.toogle = 'muestra'
            clearTimeout(this.timer)
            this.timer = setTimeout(() => { this.cierra() }, this.duration)
        }
    }
}
</script>

<style scoped>
.oculta {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s 2s, opacity 2s linear;
    position:fixed; 
    top: 10%; 
    right: 5%;
    z-index:9999; 
}
.muestra {
    display: block;
    position:fixed; 
    top: 10%; 
    right: 5%;
    z-index:9999; 
}
.texto {
    padding: 3px;
}
.right-space {
    margin-right: 8px;
}
</style>