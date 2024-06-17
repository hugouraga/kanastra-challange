const csvToString = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (event) => {
      if (event.target) {
        resolve(event.target.result as string);
      } else {
        throw new Error(
          "Ocorreu um erro ao ler o arquivo. Não foi possível obter os dados."
        );
      }
    };
    reader.onerror = () => {
      reject(
        new Error(
          "Ocorreu um erro ao ler o arquivo. Não foi possível obter os dados."
        )
      );
    };
  });
};

export { csvToString };
