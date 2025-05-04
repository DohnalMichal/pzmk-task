const getPopupDescription = (title: string, id = "N/A") => {
  return `
    <div class="p-2 text-sm bg-white text-black w-48">
      <div class="font-semibold mb-1">${title}</div>
      <div class="space-y-1">
        <p><span class="font-medium">ID:</span> ${id}</p>
      </div>
    </div>
  `;
};

export { getPopupDescription };
