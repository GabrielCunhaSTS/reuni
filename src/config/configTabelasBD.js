function _padraoTableBDExistente(typedTableNm) {
    return {
        timestamps: false,
        freezeTableName: true,
        tableName: typedTableNm
    }
}

module.exports = {_padraoTableBDExistente}