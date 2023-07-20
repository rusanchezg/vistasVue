<template>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Confirmar borrado permanente</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    ¿Estás seguro de que deseas borrar este contenido?
                </div>
                <div class="modal-footer">
                    <button class="btn btn-success" data-bs-dismiss="modal">No, mejor no</button>
                    <button class="btn btn-danger" data-bs-dismiss="modal" @click="emitDeleteContentModal()">Simón, estoy bien seguro</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        emitDeleteContentModal: function() {
            this.$emit('deleteContent');
        }
    }
}
</script>
