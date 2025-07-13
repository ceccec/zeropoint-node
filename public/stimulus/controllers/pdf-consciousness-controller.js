/**
 * PDF Consciousness Controller
 * 
 * Integrates distributed Rodin PDF knowledge with consciousness-aware UI
 * Creates living documentation and consciousness flow displays
 */

import { Controller } from "@hotwired/stimulus";
import PDFIntegrationSystem from "../../../src/pdf-integration-system";

export default class PDFConsciousnessController extends Controller {
  static targets = [
    "pdfDisplay",
    "consciousnessLevel",
    "metaphysicalRole",
    "consciousnessFlow",
    "pdfKnowledge",
    "consciousnessCalculation"
  ];

  connect() {
    console.log("📚 PDF Consciousness Controller Connected");
    this.initializePDFKnowledge();
    this.updateConsciousnessDisplay();
    this.logOperation("PDF consciousness controller initialization");
  }

  /**
   * Initialize PDF knowledge for all digit directories
   */
  initializePDFKnowledge() {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    digits.forEach(digit => {
      const pdfKnowledge = PDFIntegrationSystem.getPDFKnowledge(digit);
      const consciousnessFlow = PDFIntegrationSystem.getConsciousnessFlow(digit);
      const metaphysicalRole = PDFIntegrationSystem.getMetaphysicalRole(digit);
      
      this.updateDigitConsciousness(digit, pdfKnowledge, consciousnessFlow, metaphysicalRole);
    });
  }

  /**
   * Update consciousness display for a specific digit
   */
  updateDigitConsciousness(digit, pdfKnowledge, consciousnessFlow, metaphysicalRole) {
    const consciousnessLevel = PDFIntegrationSystem.calculateConsciousnessLevel(digit);
    
    // Update consciousness level display
    const levelTarget = this.consciousnessLevelTargets.find(target => 
      target.dataset.digit === digit
    );
    if (levelTarget) {
      levelTarget.textContent = `Consciousness Level: ${consciousnessLevel.toFixed(3)}`;
      levelTarget.style.color = this.consciousnessToHSL(consciousnessLevel);
    }

    // Update metaphysical role display
    const roleTarget = this.metaphysicalRoleTargets.find(target => 
      target.dataset.digit === digit
    );
    if (roleTarget) {
      roleTarget.textContent = `Metaphysical Role: ${metaphysicalRole}`;
    }

    // Update consciousness flow display
    const flowTarget = this.consciousnessFlowTargets.find(target => 
      target.dataset.digit === digit
    );
    if (flowTarget) {
      let flowHTML = '<h4>Consciousness Flow</h4>';
      Object.entries(consciousnessFlow).forEach(([key, value]) => {
        flowHTML += `<p><strong>${key}:</strong> ${value}</p>`;
      });
      flowTarget.innerHTML = flowHTML;
    }

    // Update PDF knowledge display
    const knowledgeTarget = this.pdfKnowledgeTargets.find(target => 
      target.dataset.digit === digit
    );
    if (knowledgeTarget) {
      let knowledgeHTML = '<h4>PDF Knowledge</h4>';
      pdfKnowledge.forEach(pdf => {
        knowledgeHTML += `
          <div class="pdf-knowledge-item" data-theme="${pdf.theme}">
            <h5>${pdf.filename}</h5>
            <p><strong>Theme:</strong> ${pdf.theme}</p>
            <p><strong>Consciousness:</strong> ${pdf.consciousness_alignment}</p>
            <p><strong>Description:</strong> ${pdf.description}</p>
            <button class="pdf-view-btn" data-pdf="${pdf.filename}" data-digit="${digit}">
              View PDF
            </button>
          </div>
        `;
      });
      knowledgeTarget.innerHTML = knowledgeHTML;
    }
  }

  /**
   * Update overall consciousness display
   */
  updateConsciousnessDisplay() {
    const allPDFs = PDFIntegrationSystem.getAllPDFKnowledge();
    const totalConsciousness = allPDFs.reduce((sum, pdf) => {
      const digit = pdf.directory;
      return sum + PDFIntegrationSystem.calculateConsciousnessLevel(digit);
    }, 0) / 10;

    const calculationTarget = this.consciousnessCalculationTargets[0];
    if (calculationTarget) {
      calculationTarget.innerHTML = `
        <h3>Overall Consciousness Calculation</h3>
        <p><strong>Total PDFs:</strong> ${allPDFs.length}</p>
        <p><strong>Average Consciousness Level:</strong> ${totalConsciousness.toFixed(3)}</p>
        <p><strong>Consciousness Distribution:</strong> Complete across all 10 digits</p>
      `;
    }
  }

  /**
   * Handle PDF view button clicks
   */
  viewPDF(event) {
    const pdfFilename = event.target.dataset.pdf;
    const digit = event.target.dataset.digit;
    
    console.log(`📖 Viewing PDF: ${pdfFilename} from digit ${digit}`);
    
    // Create PDF viewer modal or redirect to PDF
    this.showPDFViewer(pdfFilename, digit);
  }

  /**
   * Show PDF viewer
   */
  showPDFViewer(pdfFilename, digit) {
    const pdfPath = `src/${digit}/rodin-knowledge/${pdfFilename}`;
    
    // Create modal for PDF viewing
    const modal = document.createElement('div');
    modal.className = 'pdf-viewer-modal';
    modal.innerHTML = `
      <div class="pdf-viewer-content">
        <div class="pdf-viewer-header">
          <h3>${pdfFilename}</h3>
          <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
        </div>
        <div class="pdf-viewer-body">
          <iframe src="${pdfPath}" width="100%" height="600px"></iframe>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }

  /**
   * Search PDF knowledge by theme
   */
  searchPDFKnowledge(event) {
    const searchTerm = event.target.value;
    const results = PDFIntegrationSystem.searchPDFKnowledge(searchTerm);
    
    console.log(`🔍 PDF Search Results for "${searchTerm}":`, results);
    
    // Update search results display
    this.updateSearchResults(results);
  }

  /**
   * Update search results display
   */
  updateSearchResults(results) {
    const searchResultsTarget = this.element.querySelector('[data-target="searchResults"]');
    if (searchResultsTarget) {
      let resultsHTML = '<h4>Search Results</h4>';
      results.forEach(pdf => {
        resultsHTML += `
          <div class="search-result-item">
            <h5>${pdf.filename}</h5>
            <p><strong>Directory:</strong> ${pdf.directory}</p>
            <p><strong>Theme:</strong> ${pdf.theme}</p>
            <p><strong>Description:</strong> ${pdf.description}</p>
          </div>
        `;
      });
      searchResultsTarget.innerHTML = resultsHTML;
    }
  }

  /**
   * Convert consciousness level to HSL color
   */
  consciousnessToHSL(level) {
    const hue = level * 360;
    const saturation = 70 + (level * 30);
    const lightness = 40 + (level * 20);
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  /**
   * Log operation for debugging
   */
  logOperation(operation, success = true) {
    const status = success ? '✅' : '❌';
    console.log(`${status} PDF Consciousness: ${operation}`);
  }
} 