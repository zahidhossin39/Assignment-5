const issuesCard = document.getElementById("issues-card");
const btnAll = document.getElementById("btn-all");
const btnOpen = document.getElementById("btn-open");
const btnClosed = document.getElementById("btn-closed");
const issueCount = document.getElementById("issue-count");

let allIssues = [];

const displayIssues = (issues) => {
  issuesCard.innerHTML = "";

  if (issueCount) {
    issueCount.innerText = `${issues.length} Issues`;
  }

  let cardsHtml = "";
  issues.forEach((issue) => {
    const isClosed = issue.status.toLowerCase() === "closed";
    const borderColor = isClosed ? "border-[#A855F7]" : "border-[#00A96E]";
    const statusIcon = isClosed
      ? "images/Closed- Status .png"
      : "images/Open-Status.png";

    cardsHtml += `
            <div class="issue-card flex flex-col  rounded-xl shadow-xl border-t-4 ${borderColor} p-5 transition-transform hover:scale-[1.02] cursor-pointer" data-id="${issue.id}">
        
        <div class="flex items-center justify-between mb-4">
            <div class="flex items-center justify-center w-8 h-8 ">
               <img src="${statusIcon}" alt="">
            </div>
            <span class="px-6 py-1.5 rounded-full bg-red-100 text-red-500 text-[10px] font-extrabold uppercase tracking-wider">
                ${issue.priority}
            </span>
        </div>

        <div class="flex-1">
            <h3 class="text-sm font-bold text-slate-800 leading-snug mb-2">
                ${issue.title}
            </h3>
            <p class="text-xs text-slate-500 line-clamp-2 mb-4">
                ${issue.description}
            </p>
        </div>

        <div class="flex flex-wrap gap-2 mb-6">
            <span class="flex items-center gap-1.5 px-2 py-1 rounded-3xl bg-red-100 text-red-500 text-[10px] font-bold">Bug</span>

                <span class="flex items-center gap-1.5 px-2 py-1 rounded-3xl bg-amber-100 text-amber-500 text-[10px] font-bold">
                
                HELP WANTED
            </span>
        </div>

        <div class="pt-4 border-t-2 border-gray-200">
            <p class="text-[10px] font-semibold text-slate-400 mb-2">#${issue.id} by ${issue.author}</p>
            <p class="text-[10px] text-slate-400">${issue.updatedAt}</p>
        </div>

    </div>`;
  });

  issuesCard.innerHTML = cardsHtml;
};

const fetchIssues = async () => {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  allIssues = data.data;
  displayIssues(allIssues);
};

// Helper to update button UI states
const setActiveButton = (activeBtn) => {
  [btnAll, btnOpen, btnClosed].forEach((btn) => {
    btn.classList.remove("btn-primary");
  });
  activeBtn.classList.add("btn-primary");
};

btnAll.addEventListener("click", () => {
  setActiveButton(btnAll);
  displayIssues(allIssues);
});

btnOpen.addEventListener("click", () => {
  setActiveButton(btnOpen);
  displayIssues(allIssues.filter((i) => i.status.toLowerCase() === "open"));
});

btnClosed.addEventListener("click", () => {
  setActiveButton(btnClosed);
  displayIssues(allIssues.filter((i) => i.status.toLowerCase() === "closed"));
});

issuesCard.addEventListener("click", async (event) => {
  const card = event.target.closest(".issue-card");
  if (card) {
    const issueId = card.dataset.id;

    const res = await fetch(
      `https://phi-lab-server.vercel.app/api/v1/lab/issue/${issueId}`,
    );
    const data = await res.json();
    const issue = data.data;

    const modal = document.getElementById("my_modal_5");
    modal.innerHTML = `
           <div
        class="modal-box w-11/12 max-w-3xl"
      >
        <!-- start  -->
        <header class="mb-6">
            <h1 class="text-3xl font-bold text-slate-900 mb-4">Fix broken image uploads</h1>
            
            <div class="flex items-center gap-2 text-sm text-slate-400 font-medium">
                <span class="bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">Opened</span>
                <span>•</span>
                <span>Opened by <span class="text-slate-500 font-semibold">Fahim Ahmed</span></span>
                <span>•</span>
                <span>22/02/2026</span>
            </div>
        </header>

        <div class="flex items-center gap-3 mb-8">
            <span class="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-50 text-red-500 text-[11px] font-extrabold tracking-wide uppercase">
                <i class="fa-solid fa-circle-info"></i>
                BUG
            </span>

            <span class="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 text-amber-500 text-[11px] font-extrabold tracking-wide uppercase">
               <i class="fa-solid fa-circle-info"></i>
                HELP WANTED
            </span>
        </div>

        <div class="mb-10 text-slate-500 leading-relaxed text-lg">
            The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.
        </div>

<div class="bg-slate-50 rounded-2xl p-6 grid grid-cols-3 items-center mb-8">
    
    <div>
        <p class="text-slate-400 text-sm font-medium mb-1">Assignee:</p>
        <p class="text-slate-900 font-bold text-lg">Fahim Ahmed</p>
    </div>

    <div class="text-center">
        <p class="text-slate-400 text-sm font-medium mb-2">Priority:</p>
        <span class="bg-red-500 text-white px-5 py-1.5 rounded-lg text-xs font-black tracking-widest uppercase shadow-sm">
            HIGH
        </span>
    </div>

    <div></div>
    
</div>



        <div class="modal-action">
          <form method="dialog">
            <button class="btn btn-primary">Close</button>
          </form>
        </div>
      </div>
      `;
    modal.showModal();
  }
});

fetchIssues();
